const https = require("https");
const tls = require("tls");

const checkSSL = async (req, res) => {
  let { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL required" });
  }

  try {
    if (url.startsWith("http://")) {
      return res.status(400).json({
        error: "HTTP URL detected — SSL/TLS only works with HTTPS!",
        suggestion: "Try https:// instead",
      });
    }

    url = url.replace(/^https?:\/\//, "");
    url = url.split("/")[0];
  } catch {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const options = {
    host: url,
    port: 443,
    rejectUnauthorized: false,
    minVersion: 'TLSv1', 
    ciphers: 'ALL',  
    servername: url
  };

  const socket = tls.connect(options, () => {
    const cert = socket.getPeerCertificate();

    // console.log("cert", cert);

    if (!cert || Object.keys(cert).length === 0) {
      socket.destroy();
      return res.status(400).json({ error: "No certificate found" });
    }

    const validFrom = new Date(cert.valid_from);
    const validTo = new Date(cert.valid_to);
    const now = new Date();

    const daysRemaining = Math.floor((validTo - now) / (1000 * 60 * 60 * 24));

    // console.log(validFrom, validTo, now, daysRemaining);

    const isValid = socket.authorized || true;
    const isExpired = now > validTo;

    let status;
    if (isExpired) status = "Expired";
    else if (daysRemaining <= 30) status = "Expiring Soon";
    else status = "Valid";

    // console.log("socket", socket);

    socket.destroy();

    res.json({
      domain: url,
      status,
      isExpired,
      daysRemaining,
      validFrom: validFrom.toDateString(),
      validTo: validTo.toDateString(),
      issuer: cert.issuer?.O || "Unknown",
      subject: cert.subject?.CN || url,
    });
  });

  socket.on("error", (err) => {
    console.log(err);
    res.status(500).json({ error: "SSL check failed — " + err.message });
  });
};

module.exports = { checkSSL };

