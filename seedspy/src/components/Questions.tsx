export default function Questions() {
  return (
    <section className="w-full bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-12">
        {/* Colonne de gauche */}
        <div className="lg:w-1/3">
          <h2 className="text-4xl font-semibold text-black mb-4">
            Frequently asked questions
          </h2>
          <p
            className="
              text-[18px]       
              font-medium      
              leading-[1.6em]  
              text-[#6B6B6B]   
              text-left         
              max-w-xl mx-0     
            "
          >
            If you still have questions, feel free to get in touch with us.
          </p>
        </div>

        {/* Colonne de droite — accordéon */}
        <div className="lg:w-2/3 space-y-4">
          {[
            "What is a Slime Chunk?",
            "How do I find caves?",
            "Does this work on Bedrock?",
            "Can I save my results?",
            "Is this open source?",
          ].map((question) => (
            <details
              key={question}
              className="group bg-gray-100 rounded-lg border border-gray-200"
            >
              <summary
                className={`
                    faq-summary
                    w-full                          
                    cursor-pointer list-none
                    py-4 px-8                       
                    flex justify-between items-center

                    text-[20px]                     
                    font-manrope font-bold          
                    leading-[1.4em] tracking-normal 
                    text-black text-left            
                  `}
              >
                {question}
              </summary>
              <div className="px-6 pb-4 text-gray-700">
                {/* Remplace ce paragraphe par la réponse adaptée */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                vehicula hendrerit sem, sit amet fermentum metus commodo ac.
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
