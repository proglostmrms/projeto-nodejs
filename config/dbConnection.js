const { Client } = require('pg')

const client = new Client({
    connectionString: 'postgres://xxvvntbhiylhjf:f71df9d8ca62554c37d4715467b32a2078fb1015af5333b7454e5e64b937c316@ec2-54-165-90-230.compute-1.amazonaws.com:5432/ddocmp6jj4i2b5',
    ssl: { rejectUnauthorized: false }
})

client.connect()

module.exports = client