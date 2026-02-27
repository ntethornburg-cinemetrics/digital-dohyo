import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent mb-6">
          Digital Dohyo
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Master sumo through digital video analysis. Compare techniques side-by-side,
          annotate key moments, and track your progress over time.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/analysis">Start Analysis</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/library">Browse Library</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
