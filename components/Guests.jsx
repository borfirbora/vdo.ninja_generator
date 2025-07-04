'use client';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addGuest } from '@/redux/linkReducer'
import slugify from "@/hooks/slugify";
import GuestsTable from "./GuestsTable";

export default function Guests() {
  const links = useSelector((state) => state.links)
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    guestName: '',
  });
  const [alert, setAlert] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addGuest({
      guestName: form.guestName,
      guestId: slugify(form.guestName),
      guestLink: `https://vdo.ninja/?room=${links.directorLink.meetSlug}&push=${slugify(form.guestName)}&miconly&proaudio&novideo&autostart&cleanoutput&nocontrols&nosettings&nohangupbutton&nomicbutton&novideobutton&hideheader&hidemenu&nopreview&consent&directorchat&label=${encodeURI(form.guestName.trim())}`
    }));
    setAlert(`${form.guestName}, konuk olarak eklendi...`);
    setForm({
      guestName: '',
    })
  }

  if (links.directorLink.meetLink) {
    return (
      <div
        className="flex flex-col w-full items-center justify-center gap-4"
      >
        <h2>{links.directorLink.meetName} başlıklı Oturumun Katılımcıları</h2>
        <form title="Katılımcı Ekle" className="flex flex-col w-full max-w-lg gap-3" onSubmit={handleSubmit}>
          <label htmlFor="guestName" className="text-sm font-medium text-gray-700">Katılımcı Adı:</label>
          <input
            type="text"
            id="guestName"
            name="guestName" // name attribute'u state key'i ile aynı
            value={form.guestName} // State'e bağla
            onChange={handleChange} // Genel onChange fonksiyonunu kullan
            placeholder="Katılımcı Adı Girin"
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Katılımcı Adı Girin"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 mt-4"
          >
            Katılımcı Ekle
          </button>
        </form>
        <div aria-live="polite" className="sr-only" role="status">
          {alert}
        </div>
        {links.guestLinks.length > 0 && (
          <>
            <hr />
            <h2>Mevcut Katılımcılar: {links.guestLinks.length}</h2>
            <GuestsTable />
          </>
        )}
      </div>
    );
  }
}