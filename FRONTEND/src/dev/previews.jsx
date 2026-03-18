import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Login from "../components/Users/Login.jsx";
import PublicPosts from "../components/Posts/PublicPosts.jsx";

const ComponentPreviews = () => {
	return (
		<Previews palette={<PaletteTree/>}>
			<ComponentPreview path="/Login">
				<Login/>
			</ComponentPreview>
			<ComponentPreview path="/PublicPosts">
				<PublicPosts/>
			</ComponentPreview>
		</Previews>
	)
}

export default ComponentPreviews