const { YoutubeTranscript } = require('youtube-transcript');
const fs = require('fs');

async function run() {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript('Y-Heh2ZNqTU');
    const text = transcript.map(t => t.text).join(' ');
    fs.writeFileSync('video1.txt', text, 'utf-8');
    console.log('Success, wrote to video1.txt');
  } catch (error) {
    console.error('Error fetching transcript:', error);
  }
}

run();
