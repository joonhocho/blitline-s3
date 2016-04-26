/* eslint camelcase: 0 */
import blitline from 'simple_blitline_node';
import http from 'http';

const TIMEOUT = 30 * 1000; // 30 seconds

/*

JobResponse {
  results: [{
    images: [{
      image_identifier: String!
      s3_url: String!
    }]
    job_id: String!
    error: String
  }]
}

PollingResponse {
  results: {
    original_meta: {
      width: Number!
      height: Number!
    }
    images: [{
      image_identifier: String!
      s3_url: String!
      meta: {
        width: Number!
        height: Number!
      }
    }]
    job_id: String!
  }
}

*/

const pollJob = (jobId) =>
  new Promise((resolve, reject) => {
    const req = http.get({
      host: 'cache.blitline.com',
      port: 80,
      path: `/listen/${jobId}`,
    }, (res) => {
      res.setEncoding('utf8');
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        try {
          const data = JSON.parse(chunks.join(''));
          data.results = JSON.parse(data.results);
          resolve(data);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
    req.setTimeout(TIMEOUT, reject);
  });


const pollFromJobResponse = (response) =>
  pollJob(response.results[0].job_id);


export default (config, jobOptions) => {
  const {
    APPLICATION_ID,
    BUCKET,
    NAME_PREFIX,
  } = config;

  const uriPrefix = `https://${BUCKET}.s3.amazonaws.com/${NAME_PREFIX}`;

  const configFunction = (func) => {
    const {save} = func;
    if (typeof save === 'string') {
      return {
        ...func,
        save: {
          image_identifier: save,
          s3_destination: {
            bucket: BUCKET,
            key: NAME_PREFIX + save,
          },
        },
      };
    }
    return func;
  };

  const formatImage = ({image_identifier, meta}) => ({
    uri: uriPrefix + image_identifier,
    meta,
  });

  const formatPollingResponse = ({results: {job_id, original_meta, images}}) => ({
    jobId: job_id,
    originalMeta: original_meta,
    images: images.map(formatImage),
  });

  return (src, functions, options) => {
    blitline.addJob({
      ...jobOptions,
      application_id: APPLICATION_ID,
      ...options,
      src,
      functions: functions.map(configFunction),
    });

    return blitline.postJobs()
      .then(pollFromJobResponse)
      .then(formatPollingResponse);
  };
};
