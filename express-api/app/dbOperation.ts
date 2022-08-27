const Pool = require('pg').Pool
import Server from '../model/Server';
import moment from 'moment';
import ServerType from '../model/ServerType';
import { IEntity } from '../model/IEntity';

module dbOperation {

    //create connection pool with database configuration details
    const pool = new Pool({
        user: 'postgres',
        host: 'db',
        password: 'postgres',
        database: 'Severly',
        port: '5432'
    });

    //get all data and divide servers and types in array

    export const getAllData = async () => {
        try {
            let servers = await pool.query("SELECT * FROM servers");
            let types = await pool.query("SELECT * FROM server_types");
            console.log([servers.rows, types.rows])
            return [servers.rows, types.rows];
        }

        catch (err) {
            throw err;
        }
    };

    //get server by id query

    export const getServerById = async (id: string) => {
        try {
            let res = await pool.query(`SELECT * FROM Servers WHERE Id = '${id}'`);
            return res.rows;
        }
        catch (err) {
            console.log(err);
        }
    };

    // add server query

    export const AddServer = async (server: Server) => {
        try {
            let res = await pool.query(`INSERT INTO servers (id,ip_adress,server_name,type_id,is_running,time_running ,last_start,last_end) 
            VALUES
            ('${server.id}','${server.ipAdress}','${server.name}',${server.typeId}, ${server.isRunning}, ${server.timeRunning}, null, null)
            `);
            return res;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    };


    // add server type query
    export const AddType = async (type: ServerType) => {
        try {
            let res = await pool.query(`INSERT INTO server_types (type_name, rate) 
            VALUES
            ('${type.name}','${type.rate}')
            `);
            return res;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    };

    //delete server query

    export const deleteServer = async (id: string, obj: IEntity) => {
        try {
            obj === Server ?
                await pool.query(`DELETE FROM servers WHERE Id='${id}'`) :
                await pool.query(`DELETE FROM server_types WHERE Id='${id}'`)
        }
        catch (err) {
            throw err;
        }
    }

    //update server's last start query

    export const addStartTime = async (id: string) => {
        let currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        await pool.query(`UPDATE servers 
        SET last_start = '${currentTime}',
        is_running = true
        WHERE id = '${id}'

            `);

    }

    //update server's last start query

    export const addEndTime = async (id: string) => {
        let currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        await pool.query(`UPDATE servers 
        SET last_end = '${currentTime}',
        is_running = false
        WHERE id = '${id}'
        `);

        //set time is running based on last substracted dates

        setTimeRunning(id, await subtractDates(id));
    }

    // subtract the dates query

    const subtractDates = async (id: string) => {

        let res = await pool.query(`SELECT  
        EXTRACT(EPOCH FROM (last_end - last_start))
        from servers where id = '${id}'`);
        let time = parseInt(res.rows[0].extract)
        if (isNaN(time))
            time = 0;
        console.log(time);
        return time;
    }

    // set time runnning as (time already running + time to add)

    const setTimeRunning = async (id: string, time: number) => {

        let query = pool.query(`UPDATE Servers 
            SET time_running = time_running + ${time}
            WHERE Id = '${id}'
            `).then((res: any) => {
            console.log(res);
        });
    }
}

export default dbOperation;