import { configure } from "enzyme";
//adapter for version of react that we are using
//need to make sure Jest knows how to call this adapter
//so make sure setupFiles is included in package.json
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
