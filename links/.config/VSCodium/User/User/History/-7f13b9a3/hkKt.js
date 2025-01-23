"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startMonitoring = startMonitoring;
const configs_1 = require("../../shared/configs");
const db_1 = __importDefault(require("./db"));
const LogDAO_1 = __importDefault(require("./db/LogDAO"));
const config = (0, configs_1.getBackendConfig)();
function monitorDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const size = yield db_1.default.getDatabaseSize();
            if (size > config.database.max_database_size) {
                console.log('Database size exceeded limit. Pruning old logs...');
                yield LogDAO_1.default.pruneLogs(config.database.prune_batch_size);
                console.log(`Pruned ${config.database.prune_batch_size} logs.`);
            }
        }
        catch (error) {
            console.error('Error monitoring database size:', error);
        }
    });
}
// Run the monitor periodically
function startMonitoring() {
    monitorDatabase();
    setInterval(monitorDatabase, config.database.prune_interval); // Check every 60 seconds
}
