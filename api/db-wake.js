const { supabase } = require('./db-client');

module.exports = async function handler(req, res) {
  try {
    // Simple query to keep Supabase database alive
    // Supabase free tier pauses after 7 days of inactivity
    const { data, error } = await supabase
      .from('contacts')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Wake ping failed:', error.message);
      return res.status(500).json({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      });
    }

    console.log('Wake ping successful at', new Date().toISOString());
    return res.status(200).json({
      success: true,
      message: 'Database is awake!',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Wake ping error:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      timestamp: new Date().toISOString(),
    });
  }
};
