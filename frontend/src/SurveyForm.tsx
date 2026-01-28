import React, {useState} from 'react'; // React + useState Hook

type Child={
    name: string;
    birthDate: string;
    status: string;
}

const SurveyForm: React.FC = () =>{
    
    const [name, setName] = useState<string>('');

    const [married, setMarried] = useState<boolean>(false);

    const [spouseName, setSpouseName]= useState<string>('');

    const [children, setChildren]= useState<Child[]>([]);

    const [errors, setErrors]= useState<string[]>([]);

    const handleSubmit =(e: React.FormEvent)=>{
       e.preventDefault();

        const newErrors:string[]=[];

        //Name prüfen
        if(!name.trim()){
            newErrors.push('Name ist erforderlich');
        }
        //Ehepartner prüfen
        if(married && !spouseName.trim()){
            newErrors.push('Bitte Name des Ehepartners eingeben');
        }

        children.forEach((child, index)=>{
            if (!child.name.trim()) {
               newErrors.push(`Name von Kind ${index + 1} fehlt`);
            }
           if (!child.birthDate) {
           newErrors.push(`Geburtsdatum von Kind ${index + 1} fehlt`);
          }
           if (!child.status.trim()) {
           newErrors.push(`Status von Kind ${index + 1} fehlt`);
           }
        });





        if(newErrors.length>0){
            setErrors(newErrors);
            return;
        }
        setErrors([]);
        
        console.log({name, married, spouseName, children});

        alert('Formular-Daten in Konsole angezeigt');
    };
    const addChild=() =>{
        setChildren([
            ...children,
            {name:'',birthDate:'',status:''}
        ]);
    };
    const removeChild =(index:number)=>{
        setChildren(children.filter((_,i)=> i !==index));
    };

    return(

        <form onSubmit={handleSubmit}>

              {errors.length > 0 &&(
                <div style={{color: 'red', marginBottom: '10px'}}>
                    <ul>
                        {errors.map((error,index)=>(
                            <li key={index}>{error}</li>
                        ))}
                    </ul>

                </div>
            )}

            <div>
                <label>Name:</label>
                <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)} 
                 />
            </div>
            <div>
                <label>Verheiratet:</label>
                <input
                 type="checkbox"
                 checked={married}
                 onChange={(e)=> setMarried(e.target.checked)}
                />
            </div>
            {married &&(
                <div>
                    <label> Name des Ehepartners:</label>
                    <input
                    type="text"
                    value={spouseName}
                    onChange={(e) => setSpouseName(e.target.value)}
                    />
                     <h3>Kinder</h3>
                     
                     {children.map((child,index)=>(
                        <div key={index} style={{ marginBottom: '10px' }}>
                            <input
                             type="text"
                             placeholder="Name"
                             value={child.name}
                             onChange={(e) => {
                             const updated = [...children];
                              updated[index].name = e.target.value;
                             setChildren(updated);
                            }}
                            />
                            <input
                             type="date"
                             placeholder="Geburtsdatum"
                             value={child.birthDate}
                             onChange={(e) => {
                             const updated = [...children];
                              updated[index].birthDate  = e.target.value;
                             setChildren(updated);
                            }}
                            />
                            <input
                             type="text"
                             placeholder="Familienstand"
                             value={child.status}
                             onChange={(e) => {
                             const updated = [...children];
                              updated[index].status  = e.target.value;
                             setChildren(updated);
                            }}
                            />
                            <button type="button" onClick={()=> removeChild(index)} >Kind löschen</button>
                            

                        </div>
                        ))}
                <button type='button' onClick={addChild}>Kind hinzufügen</button>
                </div>

                
            )}
            
            <button type="submit">Speichern</button>
        </form>
    );
    

}
export default SurveyForm;