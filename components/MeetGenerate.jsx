'use client';
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setLink, resetLink } from '@/redux/linkReducer'
import slugify from "@/hooks/slugify";


function MeetGenerate() {
  const [meetName, setMeetName] = useState('');
  const directorLink = useSelector((state) => state.links.directorLink)
  const dispatch = useDispatch();

  const submitHandler = () => {
    dispatch(setLink({
      meetName: meetName,
      meetSlug: slugify(meetName),
      meetLink: `https://vdo.ninja/?director=${slugify(meetName)}&miconly&proaudio&novideo&autostart&muted`
    }));
    setMeetName('');
  }

  if (directorLink.meetName) {
    return (
      <div
        className="flex flex-col w-full items-center justify-center gap-4"
      >
<p><strong>{directorLink.meetName}</strong> konulu toplantı yönetici bağlantısı başarıyla oluşturuldu.</p>
<a href={directorLink.meetLink} target="_blank" rel="noopener noreferrer">Yönetici olarak katıl</a>
<p>Katılımcıları ekleyip bağlantılarını gönderebilirsiniz.</p>
<button onClick={() => dispatch(resetLink())}>Yeni bir toplantı oluştur</button>
      </div>
    );
  }
  return (
    <div
      className="flex flex-row w-full items-center justify-center gap-4"
    >
      <h2>Toplantı Oluştur</h2>
      <input
        type="text"
        value={meetName}
        onChange={(e) => setMeetName(e.target.value)}
        placeholder="Toplantı konusunu girin"
      />
      <button
        onClick={submitHandler}
        disabled={!meetName}
      >
        Oluştur...
      </button>
    </div>
  )
}

export default MeetGenerate