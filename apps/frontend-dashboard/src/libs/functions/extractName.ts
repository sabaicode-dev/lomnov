export default function extractName(name:string | undefined): string{
    if(name?.includes('.')){
      const [...keys] = name.split('.');
      return keys[0];
    }else return name!;
  }