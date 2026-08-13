const { supabase } = require('./db-client');

module.exports = async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email is required.' });
    }
    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          name: name.trim(),
          email: email.trim(),
          phone: phone ? phone.trim() : null,
          subject: subject ? subject.trim() : null,
          message: message.trim(),
        },
      ])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: 'Failed to save your message. Please try again.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
    });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
};
