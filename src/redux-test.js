/**
 * 用户的数据包括三部分，姓名（username）、年龄（age）、性别（gender）
 */

const usersReducer = (state=[],action)=>{
    if(!state){
        return[
            {
                username: 'xujun',
                age: 27,
                gender: 'male'
            }
        ]
    }
    switch (action.type){
        case "ADD_USER":
            return [...state,action.user]
        case 'DELETE_USER':
            return [...state.slice(0,action.index),...state.slice(action.index+1)]
        case 'UPDATE_USER':
            return [...state.map((user,index)=>{
                if(index === action.index){
                    return {...user,...action.user}
                }else{
                    return user
                }
            })]
        default:
            return state
    }
}

/* 增加用户操作 */
dispatch({
    type: 'ADD_USER',
    user: {
      username: 'Lucy',
      age: 12,
      gender: 'female'
    }
  })
  
  /* 通过 id 删除用户操作 */
  dispatch({
    type: 'DELETE_USER',
    index: 0 // 删除特定下标用户
  })
  
  /* 修改用户操作 */
  dispatch({
    type: 'UPDATE_USER',
    index: 0,
    user: {
      username: 'Tomy',
      age: 12,
      gender: 'male'
    }
  })