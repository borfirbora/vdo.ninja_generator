import Footer from "@/components/Footer";
import Guests from "@/components/Guests";
import Header from "@/components/Header";
import MeetGenerate from "@/components/MeetGenerate";

export default function Home() {

  return (
    <div
    className="flex flex-col min-w-screen min-h-screen items-center justify-center"
    >
<Header />
<main>
<MeetGenerate />
<Guests />
</main>
<Footer />
    </div>
  );
}