import VideoPlayer from "@/components/video/VideoPlayer";

const Analysis = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Video Analysis</h1>
      <div className="max-w-3xl mx-auto">
        <VideoPlayer label="Upload a video to begin" />
      </div>
    </div>
  );
};

export default Analysis;
