import type { Timestamp } from 'firebase-admin/firestore';

// Display in console as kinda easter egg thing
export const consoleArt = () => {
  console.log(`
  ██╗    ██╗ █████╗ ███████╗███████╗██╗   ██╗██████╗ 
  ██║    ██║██╔══██╗██╔════╝██╔════╝██║   ██║██╔══██╗
  ██║ █╗ ██║███████║███████╗███████╗██║   ██║██████╔╝
  ██║███╗██║██╔══██║╚════██║╚════██║██║   ██║██╔═══╝ 
  ╚███╔███╔╝██║  ██║███████║███████║╚██████╔╝██║     
   ╚══╝╚══╝ ╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝ ╚═╝     
                                                     
  `);
};

export const convertTimestamp = (date: Timestamp | Date): Date => {
  // @ts-ignore
  if (date.toDate) {
    // If the property exists then it is a timestamp
    return (date as Timestamp).toDate();
  }
  return date as Date;
};
