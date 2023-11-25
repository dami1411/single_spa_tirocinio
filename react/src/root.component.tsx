import { useForm } from 'react-hook-form'
import  * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { Hint } from 'react-autocomplete-hint';
export default function Root(props) {
  const [tasks,setTasks] = useState(JSON.parse(localStorage.getItem('tasks') || '[]') || []);
  const [listUser, setListUser] = useState([]);
  const [listUserOpt, setListUserOpt] = useState([]);
  const [choice,setChoice] = useState(''); 
  const now = new Date();
  
  const schema = yup.object().shape({
    severity : yup.number().required("severity is required").min(1).max(3),
    /*to : yup.string().required("to is required"),*/
    title : yup.string().required("title is required"),
    description: yup.string().required("description is required").min(6)
})
   
  const { register, handleSubmit, formState:{errors}, reset} = useForm({
    resolver:yupResolver(schema)
});

const getAllTasks = () => {
  return JSON.parse(localStorage.getItem('tasks') || '[]');
}

const getTasksOf = (to:string) => {
  const tasks = getAllTasks();
  return tasks.filter((t) => {return (t.to).toLowerCase() === to.toLowerCase();})
}

const saveTask = (task) => {
  try {
    const tasks = getAllTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    return true;
  } catch {
    return false;
  }
}
const handleErrorTo = () => {
	choice === '' ? document.getElementById('errorTo').style.display='block' : document.getElementById('errorTo').style.display='none';
	
	

}

const onSubmit = (data) => {
	
	if(choice === '') {document.getElementById('errorTo').style.display='block'; return}
  
  const current_id = getAllTasks().length + 1;
  const task = { ...data,to:choice, created: new Date(), finished: new Date(), id: current_id, status: 'todo' };
  console.log(data)
  console.log(task);
  if (saveTask(task)) {
    alert('task salvato con successo')
    setTasks(getAllTasks());
		reset();
		setChoice('');
  }
}
useEffect(() => {

  const names = tasks.map(m => m.to).filter((f,i,a) => a.indexOf(f) === i);
  let users = [];
  names.forEach(n => {
    const todoOf = getTasksOf(n).filter(f => f.status.toLowerCase() !== 'done');
    users.push({
        to: n,
        num_high: todoOf.filter(f => f.severity === 3).length,
        num_medium: todoOf.filter(f => f.severity === 2).length,
        num_low: todoOf.filter(f => f.severity === 1).length
    });
  });
  users = users.map(u => ({...u, rank: u.num_high * 3 + u.num_medium * 2 + u.num_low}));
  users.sort((a,b) => (b.num_high + b.num_medium + b.num_low) - (a.num_high + a.num_medium + a.num_low))
  users.sort((a,b) => a.rank - b.rank);
  setListUser(users); 
  setListUserOpt(users.map((u) => { return  {label:u.to,value:u.to} } ));  
   
   console.log('listUser', listUser)
  
},[tasks])

return (
  <div className="container my-5">
    <div className="row">
      
      <div className="col"></div>
      <div className="col-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex">

          <div className='form-group w-100'>
          <label>Severity</label>
          <select className='form-control' placeholder='type severity' {...register('severity')}>
            <option value="-1" selected hidden>-</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>
          <p className='text-danger'>{errors.severity?.message}</p>
          </div>
          <div className='form-group w-100'>
          <label>To</label>

          <Hint 
					options={listUserOpt}>	 
          <input id='inputTo' className='form-control' type='text' placeholder='to' value={choice} onChange={(e) => {setChoice(e.target.value);console.log(e.target.value)}}/>
					</Hint>
          <p className='text-danger' id='errorTo' style={{display:'none'}}>{!choice ? 'to is required' : ''}</p>
					
          </div>
    
          </div>
          <div className='form-group'>
          <label>Title</label>
          <input className='form-control' type='text' placeholder='type title' {...register('title')}/>
          <p className='text-danger'>{errors.title?.message}</p>
          </div>
          <div className="form-group">
          <label>Description</label>
          <textarea className="form-control" rows={3} cols={10} style={{resize:'none'}} placeholder="type a description..."  {...register("description")}/> 
          <p className="text-danger">{errors.description?.message}</p>
          </div>
          <button type='submit' className='btn btn-primary' onClick={ handleErrorTo }>publish</button>
        </form>
      </div>
      <div className="col-2"></div>
      <div className="col-2">
        
        {listUser.map( (l, i) => {
          return (<div className='py-1' key={i}>
				
          <b>{l.to}: </b><b> {l.rank} </b> pts
				
				  <div style={{minWidth:'210px'}}>
          <span className='rounded-circle bg-danger text-light d-inline-block text-center' style={{height: '24px', width: '24px'}}>{l.num_high}</span>
          <span className='rounded-circle bg-warning text-light d-inline-block text-center' style={{height: '24px', width: '24px'}}>{l.num_medium}</span>
          <span className='rounded-circle bg-success text-light d-inline-block text-center' style={{height: '24px', width: '24px'}}>{l.num_low}</span>
          </div>
					</div>)

        })}
        
      </div>
      <div className="col"></div>
    </div>
    
    
  </div>
  );
}
