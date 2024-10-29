module.exports = {
    dialect: 'postgres', 
    localhost: 'loscalhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'devburger',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    },
}