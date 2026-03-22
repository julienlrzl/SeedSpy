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
          {(
            [
              {
                q: "What is a Slime Chunk?",
                a: "In Minecraft, slime chunks are specific 16×16 block areas where slimes can spawn below Y=40 in the Overworld, regardless of light level. Only about 1 in 10 chunks are slime chunks, and they are determined by the world seed and never change once the world is created.",
              },
              {
                q: "How does the Slime Finder work?",
                a: "The Slime Finder uses the same algorithm as Minecraft to determine which chunks are slime chunks. Enter your world seed, and the tool instantly calculates and displays all slime chunks on an interactive map. It supports both Java Edition and Bedrock Edition, which use different random number generators.",
              },
              {
                q: "How do I find my world seed?",
                a: 'In Java Edition, type /seed in the chat. In Bedrock Edition, go to Settings > Game > Seed. You can also drag and drop your level.dat file directly into the seed input and the tool will extract the seed automatically.',
              },
              {
                q: "Does this work on Bedrock Edition?",
                a: "Yes! Use the Java/Bedrock toggle above the map to switch between editions. Each edition uses a different algorithm (Java uses a Linear Congruential Generator, Bedrock uses the Mersenne Twister MT19937), so slime chunks will be in different locations for the same seed.",
              },
              {
                q: "Can I share my map with friends?",
                a: "Yes, click the share button below the map to generate a link that preserves your seed, coordinates, and zoom level. You can also download a screenshot of the current view as a PNG image.",
              },
              {
                q: "What do the colors on the map mean?",
                a: "Green squares are slime chunks where slimes can spawn below Y=40. White squares are normal chunks. The red square marks the position you searched for with the coordinate inputs.",
              },
            ] as { q: string; a: string }[]
          ).map(({ q, a }) => (
            <details
              key={q}
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
                {q}
              </summary>
              <div className="px-6 pb-4 text-gray-700">{a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
