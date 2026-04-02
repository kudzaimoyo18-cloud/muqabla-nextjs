const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || '';
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || '';
const CLOUDFLARE_STREAM_URL = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream`;

interface CloudflareUploadResponse {
  success: boolean;
  result?: {
    uid: string;
    thumbnail: string;
    playback: {
      hls: string;
      dash: string;
    };
    preview: string;
    readyToStream: boolean;
    duration: number;
  };
  errors?: Array<{ code: number; message: string }>;
}

// Get a direct upload URL for client-side uploads
export async function getDirectUploadUrl(): Promise<{
  uploadUrl: string;
  videoId: string;
} | null> {
  try {
    const response = await fetch(`${CLOUDFLARE_STREAM_URL}/direct_upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        maxDurationSeconds: 300, // 5 min max
        requireSignedURLs: false,
      }),
    });

    const data = await response.json();
    if (data.success && data.result) {
      return {
        uploadUrl: data.result.uploadURL,
        videoId: data.result.uid,
      };
    }
    return null;
  } catch (error) {
    console.error('Cloudflare direct upload error:', error);
    return null;
  }
}

// Get video details
export async function getVideoDetails(videoId: string): Promise<CloudflareUploadResponse['result'] | null> {
  try {
    const response = await fetch(`${CLOUDFLARE_STREAM_URL}/${videoId}`, {
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
      },
    });

    const data: CloudflareUploadResponse = await response.json();
    if (data.success && data.result) {
      return data.result;
    }
    return null;
  } catch (error) {
    console.error('Cloudflare get video error:', error);
    return null;
  }
}

// Delete a video
export async function deleteVideo(videoId: string): Promise<boolean> {
  try {
    const response = await fetch(`${CLOUDFLARE_STREAM_URL}/${videoId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Cloudflare delete video error:', error);
    return false;
  }
}

// Get embed/playback URL
export function getPlaybackUrl(videoId: string): string {
  return `https://customer-${CLOUDFLARE_ACCOUNT_ID}.cloudflarestream.com/${videoId}/manifest/video.m3u8`;
}

// Get thumbnail URL
export function getThumbnailUrl(videoId: string, time: number = 1): string {
  return `https://customer-${CLOUDFLARE_ACCOUNT_ID}.cloudflarestream.com/${videoId}/thumbnails/thumbnail.jpg?time=${time}s`;
}

// Get iframe embed URL
export function getEmbedUrl(videoId: string): string {
  return `https://customer-${CLOUDFLARE_ACCOUNT_ID}.cloudflarestream.com/${videoId}/iframe`;
}
