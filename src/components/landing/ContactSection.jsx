
// src/components/landing/ContactSection.jsx

export const ContactSection = () => {
  return (
    <section id="contact" className="py-16 bg-white w-full border-t">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-10"> 📞Contactez-nous</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulaire de contact */}
          <form className="bg-gray-50 p-8 rounded-2xl shadow-lg space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                placeholder="Votre nom"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                Adresse e-mail
              </label>
              <input
                type="email"
                id="email"
                placeholder="votre.email@example.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder="Votre message ici..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white rounded-full font-semiboldbg-primary transition"
              >
                Envoyer le message
              </button>
            </div>
          </form>

          {/* Carte Google Maps */}
             <div className="space-y-4">
             <div>
               <h3 className="text-xl font-semibold">📱 Téléphones :</h3>
               <p>06 71 13 49 89</p>
               <p>06 76 72 47 39</p>
             </div>
             <div>
               <h3 className="text-xl font-semibold">📧 Email :</h3>              <p>rofeo.academy@gmail.com</p>
            </div>
            
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3206.1063072154298!2d-7.5743468!3d33.2550806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda63df6eaadc9b9%3A0x1febbc1cf5e1442d!2sSmart%20Center!5e1!3m2!1sfr!2sma!4v1748623707073!5m2!1sfr!2sma"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl shadow-lg h-[450px] w-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};
