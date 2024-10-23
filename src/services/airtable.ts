import Airtable from 'airtable';
import type { Client, InsuranceProduct } from '../types';

const base = new Airtable({ apiKey: import.meta.env.VITE_AIRTABLE_API_KEY })
  .base(import.meta.env.VITE_AIRTABLE_BASE_ID);

export const getClients = async (): Promise<Client[]> => {
  const records = await base('Clients').select().all();
  return records.map(record => ({
    id: record.id,
    name: record.get('name') as string,
    email: record.get('email') as string,
    phone: record.get('phone') as string,
    status: record.get('status') as Client['status'],
    createdAt: record.get('createdAt') as string,
  }));
};

export const createClient = async (data: Omit<Client, 'id' | 'createdAt'>) => {
  try {
    const record = await base('Clients').create([
      {
        fields: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          status: data.status,
          createdAt: new Date().toISOString()
        }
      }
    ]);

    if (!record || record.length === 0) {
      throw new Error('Failed to create client record');
    }

    const newRecord = record[0];
    return {
      id: newRecord.id,
      name: newRecord.get('name') as string,
      email: newRecord.get('email') as string,
      phone: newRecord.get('phone') as string,
      status: newRecord.get('status') as Client['status'],
      createdAt: newRecord.get('createdAt') as string,
    };
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};

export const getProducts = async (): Promise<InsuranceProduct[]> => {
  const records = await base('Products').select().all();
  return records.map(record => ({
    id: record.id,
    name: record.get('name') as string,
    type: record.get('type') as InsuranceProduct['type'],
    premium: record.get('premium') as number,
    status: record.get('status') as InsuranceProduct['status'],
    clientId: record.get('clientId') as string,
    startDate: record.get('startDate') as string,
    endDate: record.get('endDate') as string,
  }));
};