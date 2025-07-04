// Simple test script to verify environment variables
// Run with: node test-env.js

console.log('Environment Variable Test');
console.log('=======================');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('OPENAI_KEY exists:', !!process.env.OPENAI_KEY);
console.log('OPENAI_KEY length:', process.env.OPENAI_KEY?.length || 0);
console.log('OPENAI_KEY first 10 chars:', process.env.OPENAI_KEY?.substring(0, 10) + '...' || 'undefined');

// Test if we can make a simple API call
if (process.env.OPENAI_KEY) {
  console.log('\nTesting OpenAI API connection...');
  
  fetch('https://api.openai.com/v1/models', {
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_KEY}`,
    },
  })
  .then(response => {
    console.log('API Response Status:', response.status);
    if (response.ok) {
      console.log('✅ OpenAI API connection successful!');
    } else {
      console.log('❌ OpenAI API connection failed');
      return response.text().then(text => console.log('Error details:', text));
    }
  })
  .catch(error => {
    console.log('❌ Network error:', error.message);
  });
} else {
  console.log('\n❌ OPENAI_KEY not found in environment variables');
} 