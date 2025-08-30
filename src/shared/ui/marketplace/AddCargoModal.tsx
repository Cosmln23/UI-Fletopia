"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./AddCargoModal.module.css";

export type AddCargoModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: Record<string, string>) => void;
};

export const AddCargoModal: React.FC<AddCargoModalProps> = ({ open, onClose, onSubmit }) => {
  const [rawText, setRawText] = useState("");
  const [showMagicWarning, setShowMagicWarning] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({
    origin: "",
    destination: "",
    loadDate: "",
    weightKg: "",
    volumeM3: "",
    pallets: "",
    goodsType: "",
    vehicleType: "",
    urgency: "medium",
    deliveryDate: "",
    priceEUR: "",
    paymentTerms: "",
    title: "",
  });
  const [attachments, setAttachments] = useState<File[]>([]);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) setTimeout(() => textRef.current?.focus(), 0);
  }, [open]);

  const handleMagic = () => {
    if (!rawText.trim()) {
      setShowMagicWarning(true);
      return;
    }
    setFormData((d) => ({
      ...d,
      origin: d.origin || "Cluj",
      destination: d.destination || "București",
      loadDate: d.loadDate || new Date(Date.now() + 86400000).toISOString().slice(0, 10),
      weightKg: d.weightKg || "1000",
      pallets: d.pallets || "8",
      goodsType: d.goodsType || "Electronice",
      vehicleType: d.vehicleType || "van",
    }));
    setShowMagicWarning(true);
  };

  const handlePickFiles = () => fileRef.current?.click();
  const handleFilesChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length) setAttachments((prev) => [...prev, ...files]);
    if (fileRef.current) fileRef.current.value = "";
  };
  const removeFile = (idx: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== idx));
  };

  const submit = () => {
    onSubmit?.(formData);
    onClose();
  };

  return (
    <div className={`modal ${open ? "active" : ""}`}>
      <div className={`glass-card rounded-xl mr-4 ml-4 pt-6 pr-6 pb-6 pl-6 ${styles.content}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Add New Cargo</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[20px]" style={{ strokeWidth: 1.5 }}><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </button>
        </div>
        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); submit(); }}>
          {/* Magic Poster */}
          <div className="space-y-3">
            <label className="block text-xs text-gray-400">Magic Poster</label>
            <textarea
              ref={textRef}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              rows={3}
              className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400 resize-y"
              placeholder="Lipește textul anunțului aici. Ex: Urgent van 8 paleți Cluj-București mâine, 1 tonă..."
            />
            <div className="flex items-center gap-2">
              <button type="button" onClick={handleMagic} className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "linear-gradient(90deg, rgba(244,114,182,0.6), rgba(99,102,241,0.6))" }}>✨ Completează Magic</button>
            </div>
            {showMagicWarning && (
              <div className="glass-border rounded-lg p-3 text-xs text-yellow-300" aria-live="polite">
                Date extrase de AI. Vă rugăm să verificați corectitudinea înainte de a posta.
              </div>
            )}
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex-1 h-px bg-white/10" />
              SAU completează manual / verifică mai jos
              <span className="flex-1 h-px bg-white/10" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-medium text-gray-300">Cargo Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-2">Cargo Title</label>
                <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} type="text" className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Enter cargo title" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">Cargo Type</label>
                <select value={formData.goodsType} onChange={(e) => setFormData({ ...formData, goodsType: e.target.value })} className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white bg-transparent">
                  <option value="">Select cargo type</option>
                  <option value="pallets">Pallets</option>
                  <option value="container">Container</option>
                  <option value="bulk">Bulk</option>
                  <option value="refrigerated">Refrigerated</option>
                  <option value="hazardous">Hazardous</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">Weight (kg) *</label>
                <input value={formData.weightKg} onChange={(e) => setFormData({ ...formData, weightKg: e.target.value })} type="number" className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Enter weight" required />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">Volume (m³)</label>
                <input value={formData.volumeM3} onChange={(e) => setFormData({ ...formData, volumeM3: e.target.value })} type="number" step="0.1" className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Enter volume (optional)" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">Vehicle Type</label>
                <select value={formData.vehicleType} onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })} className="glass-input w-full focus:outline-none text-white bg-transparent rounded-lg pt-2 pr-3 pb-2 pl-3">
                  <option value="">Select vehicle type</option>
                  <option value="van">Van 3.5t</option>
                  <option value="curtain">Prelată 8 paleți</option>
                  <option value="refrig">Refrigerated</option>
                  <option value="trailer">Trailer</option>
                  <option value="flatbed">Flatbed</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">Urgency Level</label>
                <select value={formData.urgency} onChange={(e) => setFormData({ ...formData, urgency: e.target.value })} className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white bg-transparent">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-base font-medium text-gray-300">Route Information</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-xs text-gray-400 font-medium">FROM</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">From Address</label>
                    <input value={formData.origin} onChange={(e) => setFormData({ ...formData, origin: e.target.value })} type="text" className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Enter pickup address" required />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">City</label>
                    <input type="text" className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Enter city" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">Postal Code</label>
                    <input type="text" className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Enter postal code" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">Country</label>
                    <select className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white bg-transparent">
                      <option value="">Select country</option>
                      <option value="nl">Netherlands</option>
                      <option value="de">Germany</option>
                      <option value="fr">France</option>
                      <option value="be">Belgium</option>
                      <option value="it">Italy</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">Pickup Date</label>
                    <input value={formData.loadDate} onChange={(e) => setFormData({ ...formData, loadDate: e.target.value })} type="date" className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white" />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs text-gray-400 font-medium">TO</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">To Address</label>
                    <input value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })} type="text" className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Enter delivery address" required />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">City</label>
                    <input type="text" className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Enter city" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">Postal Code</label>
                    <input type="text" className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400" placeholder="Enter postal code" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">Country</label>
                    <select className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white bg-transparent">
                      <option value="">Select country</option>
                      <option value="nl">Netherlands</option>
                      <option value="de">Germany</option>
                      <option value="fr">France</option>
                      <option value="be">Belgium</option>
                      <option value="it">Italy</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">Delivery Date</label>
                    <input value={formData.deliveryDate} onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })} type="date" className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div className="space-y-3">
            <h3 className="text-base font-medium text-gray-300">Attachments (optional)</h3>
            <div className="flex items-center gap-3">
              <button type="button" onClick={handlePickFiles} className="glass-border hover:bg-white/5 transition-all px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg">Upload files</button>
              <span className="text-xs text-gray-500">PDF, images sau documente. Poți selecta multiple fișiere.</span>
              <input ref={fileRef} type="file" multiple className="hidden" onChange={handleFilesChange} />
            </div>
            {!!attachments.length && (
              <div className="flex flex-wrap gap-2">
                {attachments.map((f, idx) => (
                  <div key={idx} className="glass-border rounded px-2 py-1 text-xs text-gray-300 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14,2 14,8 20,8"></polyline></svg>
                    <span className="truncate max-w-[160px]">{f.name}</span>
                    <span className="text-gray-500">({Math.max(1, Math.round(f.size / 1024))} KB)</span>
                    <button type="button" className="text-gray-400 hover:text-white" onClick={() => removeFile(idx)}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-medium text-gray-300">Pricing & Additional Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-2">Budget (EUR)</label>
                <input value={formData.priceEUR} onChange={(e) => setFormData({ ...formData, priceEUR: e.target.value })} type="number" className="glass-input w-full focus:outline-none placeholder-gray-400 text-white rounded-lg pt-2 pr-3 pb-2 pl-3" placeholder="Enter price" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">Special Requirements</label>
                <select className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white bg-transparent">
                  <option value="">No special requirements</option>
                  <option value="refrigerated">Refrigerated transport</option>
                  <option value="fragile">Fragile goods</option>
                  <option value="hazardous">Hazardous materials</option>
                  <option value="oversized">Oversized cargo</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">Payment Terms</label>
                <select value={formData.paymentTerms} onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })} className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white bg-transparent">
                  <option value="">Select terms</option>
                  <option value="on delivery">On delivery</option>
                  <option value="15 zile">15 zile</option>
                  <option value="30 zile">30 zile</option>
                  <option value="60 zile">60 zile</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">Additional Notes</label>
              <textarea rows={4} className="glass-input w-full px-3 py-2 rounded-lg focus:outline-none text-white placeholder-gray-400 resize-none" placeholder="Add any additional information or special instructions..."></textarea>
            </div>
          </div>
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-700">
            <button type="button" onClick={onClose} className="px-6 py-2 text-sm text-gray-400 hover:text-white transition-colors">Cancel</button>
            <button type="submit" className="glass-border hover:bg-white/5 transition-all px-6 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg">Postează Marfa</button>
          </div>
        </form>
      </div>
    </div>
  );
};


