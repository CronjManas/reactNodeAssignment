let i =1;

export const Newid =()=> {
	if(i>5){
		i=1;
	}
    return i++;
}

