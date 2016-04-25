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
blitline('http://www.source.to/your-image.jpg', [{
    name: 'resize',
    params: {
      width: 10,
      height: 10
    },
    save: 'your-image-resized.jpg' // Shortcut
}, {
    name: 'resize_to_fill',
    params: {
      width: 40,
      height: 40
    },
    save: { // Blitline default
      image_identifier: 'new_image_id',
      s3_destination: {
        bucket: 'AnotherS3Bucket',
        key: 'path/to/new/image.jpg',
      }
    }
}]).then(function(response) {
  console.log(response);
  /*
  {
    jobId: 'blitline_job_id',
    originalMeta: {
      width: 100,
      height: 100
    },
    images: [{
      url: 'http://YourS3Bucket.s3.amazonaws.com/uploads/your-image-resized.jpg',
      meta: {
        width: 10,
        height: 10
      }
    }, {...}]
  }
  */
}, function(error) {
  console.error(error);
});
```

