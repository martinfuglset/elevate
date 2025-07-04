# OpenAI API Integration Troubleshooting Guide

## Issue: AI Summary Generation Works on Localhost but Not on Vercel

### Root Cause
The main issue was the **Edge Runtime** configuration in the API route, which can have limitations with environment variables in production deployments.

### Changes Made

1. **Removed Edge Runtime**: Commented out `export const runtime = 'edge';` in `/src/app/api/generate-program/route.ts`
2. **Enhanced Error Handling**: Added comprehensive logging and error handling
3. **Updated Environment Documentation**: Added `OPENAI_KEY` to `env.example`
4. **Improved Frontend Error Display**: Added error indicators for users

### Verification Steps

#### 1. Check Environment Variables in Vercel
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Verify `OPENAI_KEY` is set correctly
5. Make sure it's available in Production, Preview, and Development environments

#### 2. Test Environment Variables Locally
```bash
# Create a .env.local file with your OpenAI key
echo "OPENAI_KEY=your_actual_openai_key_here" > .env.local

# Test the environment variable
node test-env.js
```

#### 3. Check Vercel Function Logs
1. Go to your Vercel dashboard
2. Select your project
3. Go to Functions tab
4. Look for `/api/generate-program` function
5. Check the logs for any errors

#### 4. Test the API Endpoint Directly
```bash
# Test with curl (replace with your actual domain)
curl -X POST https://your-domain.vercel.app/api/generate-program \
  -H "Content-Type: application/json" \
  -d '{"assessment":{"personalInfo":{"name":"Test"}}}'
```

### Common Issues and Solutions

#### Issue 1: "Missing OpenAI API key"
**Solution**: Ensure `OPENAI_KEY` is set in Vercel environment variables

#### Issue 2: "OpenAI API error"
**Solution**: Check if your OpenAI API key is valid and has sufficient credits

#### Issue 3: "Network error"
**Solution**: Check if Vercel can reach OpenAI's API (usually not an issue)

#### Issue 4: Edge Runtime Limitations
**Solution**: Already fixed by removing edge runtime

### Environment Variables Setup

#### Local Development (.env.local)
```env
OPENAI_KEY=sk-your-openai-api-key-here
```

#### Vercel Production
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add:
   - **Name**: `OPENAI_KEY`
   - **Value**: `sk-your-openai-api-key-here`
   - **Environment**: Production, Preview, Development

### Debugging Tips

1. **Check Console Logs**: The API now logs detailed information about environment variables and API calls
2. **Use Browser DevTools**: Check the Network tab to see the actual API response
3. **Test Incrementally**: Start with a simple API call to verify connectivity

### Fallback Behavior
The application gracefully falls back to mock data if the AI service fails, so users can still complete the assessment.

### Next Steps
1. Deploy the updated code to Vercel
2. Verify the environment variable is set correctly
3. Test the assessment form
4. Check Vercel function logs for any remaining issues

### Support
If issues persist, check:
- Vercel function logs
- OpenAI API status page
- Your OpenAI account billing/usage 