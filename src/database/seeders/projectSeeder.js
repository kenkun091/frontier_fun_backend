import db from '../../../models/index.js';

const projects = [
    { category: "BIO", projectName: "Empathogens", promotor: "psyDAO", launchTime: "dynamic", website: "catalyst", remark: "the best token ticker", url: "https://catalyst.molecule.xyz/" },
    { category: "BIO", projectName: "RMR2", promotor: "vitaDAO", launchTime: "dynamic", website: "catalyst", remark: "Aubrey de Grey", url: "https://catalyst.molecule.xyz/" },
    { category: "BIO", projectName: "cryorat", promotor: "cryoDAO", launchTime: "Dec 2", website: "juicebox", remark: "no limit", url: "https://juicebox.money/v2/p/768?tabid=about" },
    { category: "AI", projectName: "security", promotor: "x kol", launchTime: "Dec 15", website: "daofun", remark: "watch", url: "https://x.com/0xnirlin/status/1864177524189938169"},
];

async function seedProjects() {
    try {
        // Clear existing records
        await db.Project.destroy({ where: {} });

        // Insert new records
        await db.Project.bulkCreate(projects);

        console.log('Projects seeded successfully');
    } catch (error) {
        console.error('Error seeding projects:', error);
    }
}

export { seedProjects };