const sequelize = require('../../config/sequelize');
const { User, GameMode } = require('../models');
const bcrypt = require('bcrypt');

async function initDb() {
    try {
        console.log('🔄 Sincronizando base de datos...');
        await sequelize.sync({ force: true }); // WARNING: This deletes existing data!
        console.log('✅ Tablas creadas correctamente.');

        // Crear tabla de sesiones si no existe (requerida por connect-pg-simple)
        console.log('📦 Creando tabla de sesiones...');
        await sequelize.query(`
            CREATE TABLE IF NOT EXISTS "session" (
                "sid" varchar NOT NULL COLLATE "default",
                "sess" json NOT NULL,
                "expire" timestamp(6) NOT NULL
            ) WITH (OIDS=FALSE);
            
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'session_pkey') THEN
                    ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
                END IF;
            END $$;

            CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");
        `);
        console.log('✅ Tabla de sesiones lista.');

        // Crear Modos de Juego por defecto
        console.log('🎮 Creando modos de juego por defecto...');
        await GameMode.bulkCreate([
            {
                name: 'gridshot',
                description: '3 objetivos grandes. Ideal para calentar y mejorar la fluidez de movimiento.',
                target_count: 3,
                time_limit: 30
            },
            {
                name: 'sixshot',
                description: '6 micro-objetivos. Diseñado para perfeccionar la precisión en distancias largas.',
                target_count: 6,
                time_limit: 30
            }
        ]);
        console.log('✅ Modos de juego creados.');

        // Crear Admin por defecto
        console.log('👤 Creando administrador...');
        const adminPassword = await bcrypt.hash('admin123', 10);
        await User.create({
            username: 'admin',
            password: adminPassword,
            role: 'admin'
        });
        console.log('✅ Usuario admin creado (admin / admin123).');

        process.exit(0);
    } catch (err) {
        console.error('❌ Error inicializando la base de datos:', err);
        process.exit(1);
    }
}

initDb();
