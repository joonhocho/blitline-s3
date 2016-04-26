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

