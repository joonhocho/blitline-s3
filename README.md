# blitline-s3
Post Blitline jobs that uploads to s3 and do polling for the jobs.

### Install
```
npm install --save blitline-s3
```

### Usage
```javascript
// Require and configure Blitline
var blitline = require('blitline-s3')({
  APPLICATION_ID: 'APP_ID', // Your Blitline Application ID
  BUCKET: 'YourS3Bucket', // Your Amazon S3 Bucket Name
  NAME_PREFIX: 'uploads/' // Prefix for New Images Created By Blitline
});

// Send a job to Blitline
blitline('http://www.source.to/your-image.jpg', {
  resize10: {
    name: 'resize',
    params: {
      width: 10,
      height: 10
    },
    save: 'your-image-resized-10.jpg'
  },
  resize200: {
    name: 'resize',
    params: {
      width: 200,
      height: 200
    },
    save: 'your-image-resized-200.jpg'
  }
}, {
  get_exif: true // job options
}).then(function(response) {
  console.log(response);
  /*
  {
    jobId: 'blitline_job_id',
    images: {
      original: {
        uri: 'http://www.source.to/your-image.jpg',
        meta: {
          width: 400,
          height: 300,
          original_exif: {...}
        }
      },
      resize10: {...},
      resize200: {...}
    }
  }
  */
}, function(error) {
  console.error(error);
});
```


### TODO
 - Upload to pre-signed url
 - Postback callback


### Dependencies
 - Calling Blitline API: https://github.com/blitline-dev/simple_blitline_node


### License
```
The MIT License (MIT)

Copyright (c) 2016 Joon Ho Cho

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

