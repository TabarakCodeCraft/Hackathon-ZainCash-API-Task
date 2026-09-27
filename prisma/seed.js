const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

const DATA_PATH = path.join(
  __dirname,
  "data",
  "iraqi_support_dataset_3000.json"
);

async function main() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  const samples = JSON.parse(raw);

  console.log(`Seeding ${samples.length} samples...`);

  for (const sample of samples) {
    const complaine = await prisma.complaines.create({
      data: {
        msgs: sample.messages,
      },
    });

    console.log(`✔ sample id=${sample.id} -> complaine=${complaine.UniqueID}`);
  }

  console.log("Seeding done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });