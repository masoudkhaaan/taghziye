import { PrismaClient, Role } from "$/generated/prisma";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const {
    ADMIN_NAME,
    ADMIN_EMAIL,
    ADMIN_PASSWORD,
    ADMIN_ROLE,
  } = process.env;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("Admin environment variables are not properly configured.");
  }

  const existingAdmin = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (existingAdmin) {
    console.log(`Admin user already exists: ${existingAdmin.email}`);
    return;
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

  const admin = await prisma.user.create({
    data: {
      name: ADMIN_NAME ?? "Super Admin",
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: (ADMIN_ROLE as Role) ?? Role.ADMIN,
    },
  });

  console.log(
    `Admin user created successfully: ${admin.name} (${admin.email})`
  );
}

main()
  .catch((error) => {
    console.error("❌ Error running admin seed script:", error.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
