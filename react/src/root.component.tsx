import { useForm } from 'react-hook-form'
import  * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
export default function Root(props) {
  const [tasks,setTasks] = useState(JSON.parse(localStorage.getItem('tasks') || '[]') || []);
  const [listUser, setListUser] = useState([]);
  const now = new Date();
  
  const schema = yup.object().shape({
    severity : yup.number().required("severity is required"),
    to : yup.string().required("to is required"),
    title : yup.string().required("title is required"),
    description: yup.string().required("description is required").min(6)
})
   
  const { register, handleSubmit, formState:{errors} } = useForm({
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

const onSubmit = (data) => {
  console.log(props.onSubmit)
  const current_id = getAllTasks().length + 1;
  const task = { ...data, created: new Date(), finished: new Date(), id: current_id, status: 'todo' };
  console.log(data)
  console.log(task);
  if (saveTask(task)) {
    alert('task salvato con successo')
    setTasks(getAllTasks());
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

   
   console.log('listUser', listUser)
  // tasks.forEach((t) => { console.log("task di "+t.to+": ",getTasksOf(tasks,t.to))})
},[tasks])

return (
  <div className="container">
    <div className="row">
      
      <div className="col"></div>
      <div className="col-4">
        {props.name} is mounted!
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex">

          <div className='form-group w-100'>
          <label>Severity</label>
          <select className='form-control' placeholder='type severity' {...register('severity')}>
            <option value="" selected hidden>-</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>
          <p className='text-danger'>{errors.severity?.message}</p>
          </div>
          <div className='form-group w-100'>
          <label>To</label>


          <input className='form-control' type='text' placeholder='type to' {...register('to')}/>
          <p className='text-danger'>{errors.to?.message}</p>

          </div>
          <Autocomplete
          className='form-control'
            disablePortal
            id="combo-box-demo"
            options={['pippo','pluto']}
            onChange={(autoc) => console.log(autoc)}
            style={{width: 300}}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          />
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
          <button type='submit' className='btn btn-primary'>publish</button>
        </form>
      </div>
      <div className="col-2"></div>
      <div className="col-2">
        
        {listUser.map( (l, i) => {
          return (<div key={i}>
          {l.to}: &nbsp;
          <span className='rounded-circle bg-danger text-light d-inline-block text-center' style={{height: '24px', width: '24px'}}>{l.num_high}</span>
          <span className='rounded-circle bg-warning text-light d-inline-block text-center' style={{height: '24px', width: '24px'}}>{l.num_medium}</span>
          <span className='rounded-circle bg-success text-light d-inline-block text-center' style={{height: '24px', width: '24px'}}>{l.num_low}</span>
          </div>)
        })}
        
      </div>
      <div className="col"></div>
    </div>
    {tasks ? 'ok': 'error'}
    
  </div>
  );
}
