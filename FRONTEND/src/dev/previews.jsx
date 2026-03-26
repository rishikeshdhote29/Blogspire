import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Login from "../components/Users/Login.jsx";
import PublicPosts from "../components/Posts/PublicPosts.jsx";
import ResetPassword from "../components/Users/VerifyAccount.jsx";

const ComponentPreviews = () => {
	return (
		<Previews palette={<PaletteTree/>}>
			<ComponentPreview path="/Login">
				<Login/>
			</ComponentPreview>
			<ComponentPreview path="/PublicPosts">
				<PublicPosts/>
			</ComponentPreview>
			<ComponentPreview path="/ResetPassword">
				<ResetPassword/>
			</ComponentPreview>
		</Previews>
	)
}

export default ComponentPreviews