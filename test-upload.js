import fs from 'fs';
import path from 'path';

async function testUploadEndpoint() {
  const formData = new FormData();
  
  // Create a dummy pdf file
  fs.writeFileSync('dummy.pdf', 'dummy pdf content');
  
  const blob = new Blob([fs.readFileSync('dummy.pdf')], { type: 'application/pdf' });
  formData.append('image', blob, 'dummy.pdf');
  
  try {
    const res = await fetch('http://localhost:3001/api/upload', {
      method: 'POST',
      body: formData
    });
    
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Response:', text);
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

testUploadEndpoint();
