# TextSplitter
### Reworked from llamaindex SentenceSplitter

#### Description
I needed the SentenceSplitter from llamaindex but had to import the entire llamaindex package which is 1GB.  
I pulled it out and had GPT make a standalone version.  It's not exactly the same but close.

#### Installation
git clone git@github.com:bbreukelen/textSplitter.git  
cd textSplitter
node test.js

#### Usage
```javascript
import TextSplitter from '@bbreukelen/textSplitter';

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris scelerisque suscipit libero, et auctor nulla tincidunt id. Phasellus feugiat sit amet tortor ut aliquet. Aenean non vehicula ligula. Fusce felis ante, pharetra ac ultricies sed, dignissim ut elit. Quisque eros dui, auctor at laoreet ornare, euismod nec ex. Etiam consequat lorem ut cursus imperdiet. Quisque orci est, efficitur eu magna in, blandit tincidunt magna. Phasellus pharetra dolor metus, id vestibulum elit ullamcorper ac. Pellentesque in malesuada nibh. Etiam facilisis leo sed mi placerat venenatis.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris scelerisque suscipit libero, et auctor nulla tincidunt id. Phasellus feugiat sit amet tortor ut aliquet. Aenean non vehicula ligula. Fusce felis ante, pharetra ac ultricies sed, dignissim ut elit. Quisque eros dui, auctor at laoreet ornare, euismod nec ex. Etiam consequat lorem ut cursus imperdiet. Quisque orci est, efficitur eu magna in, blandit tincidunt magna. Phasellus pharetra dolor metus, id vestibulum elit ullamcorper ac. Pellentesque in malesuada nibh. Etiam facilisis leo sed mi placerat venenatis.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris scelerisque suscipit libero, et auctor nulla tincidunt id. Phasellus feugiat sit amet tortor ut aliquet. Aenean non vehicula ligula. Fusce felis ante, pharetra ac ultricies sed, dignissim ut elit. Quisque eros dui, auctor at laoreet ornare, euismod nec ex. Etiam consequat lorem ut cursus imperdiet. Quisque orci est, efficitur eu magna in, blandit tincidunt magna. Phasellus pharetra dolor metus, id vestibulum elit ullamcorper ac. Pellentesque in malesuada nibh. Etiam facilisis leo sed mi placerat venenatis.`;

const splitter = new TextSplitter({chunkSize: 256, chunkOverlap: 50});
const chunks = splitter.splitText(text);
console.log(chunks.map(c=>`${c.length}: ${c}`).join('\n\n'));
splitter.free(); // Call to release it when no longer using the splitter
```