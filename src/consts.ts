import path from 'path';
import { fileURLToPath } from 'url';

// With the move to TSUP as a build tool, this keeps path routes in other files (installers, loaders, etc) in check more easily.
// Path is in relation to a single index.js file inside ./dist
const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, '../');

export const TITLE_TEXT = ` 
 _______                                           __                ______            __    __     
/       \\                                         /  |              /      |          /  |  /  |    
$$$$$$$  |  ______    ______    ______    ______  $$ |____          $$$$$$/  _______  $$/  _$$ |_   
$$ |  $$ | /      \\  /      \\  /      \\  /      \\ $$      \\  ______   $$ |  /       \\ /  |/ $$   |  
$$ |  $$ |/$$$$$$  |/$$$$$$  | $$$$$$  |/$$$$$$  |$$$$$$$  |/      |  $$ |  $$$$$$$  |$$ |$$$$$$/   
$$ |  $$ |$$ |  $$ |$$ |  $$/  /    $$ |$$ |  $$ |$$ |  $$ |$$$$$$/   $$ |  $$ |  $$ |$$ |  $$ | __ 
$$ |__$$ |$$ \\__$$ |$$ |      /$$$$$$$ |$$ |__$$ |$$ |  $$ |         _$$ |_ $$ |  $$ |$$ |  $$ |/  |
$$    $$/ $$    $$ |$$ |      $$    $$ |$$    $$/ $$ |  $$ |        / $$   |$$ |  $$ |$$ |  $$  $$/ 
$$$$$$$/   $$$$$$$ |$$/        $$$$$$$/ $$$$$$$/  $$/   $$/         $$$$$$/ $$/   $$/ $$/    $$$$/  
          /  \\__$$ |                    $$ |                                                        
          $$    $$/                     $$ |                                                        
           $$$$$$/                      $$/                                                         
 `;
export const DEFAULT_APP_NAME = 'dgraph-db';
export const DGRAPH_INIT = 'dgraph-init';
