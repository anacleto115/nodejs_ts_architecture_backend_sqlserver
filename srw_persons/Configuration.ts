import IConfiguration from "lib_domain_context/IConfiguration";

export default class Configuration implements IConfiguration
{    
    public Get(key: string) : { [Key: string]: any; }
    {
        return {
            user: 'sa',
            password: '*****',
            server: '192.168.0.35',
            database: 'db_persons',
            options: { encrypt: true, trustServerCertificate: true }
        };
    }
}