const { builder } = require('@netlify/functions');

const handler = async (event) => {
  if (event.httpMethod === 'POST') {
    // Handle POST request
    const data = JSON.parse(event.body);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, record: data })
    };
  }

  if (event.httpMethod === 'GET') {
    // Handle GET request
    return {
      statusCode: 200,
      body: JSON.stringify({ records: [] })
    };
  }

  if (event.httpMethod === 'DELETE') {
    // Handle DELETE request
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  }
};

exports.handler = builder(handler);
