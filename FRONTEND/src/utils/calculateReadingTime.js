const calculateReadingTime=(content)=>{
	const wordPerMin=200;
	const totalWords=content?.split();
	const minutes= totalWords?.length/wordPerMin;
	const readTime=Math.ceil(minutes);

	return readTime;
}
export default calculateReadingTime;