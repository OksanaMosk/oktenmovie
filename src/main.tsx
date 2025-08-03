import {createRoot} from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {routes} from "./routes/routes.tsx";
import {Provider} from "react-redux";
import {persistor, store} from "./redux/store.ts";
import {PersistGate} from "redux-persist/integration/react";
import {LoaderComponent} from "./components/loader-component/LoaderComponent.tsx";
import './index.css'

createRoot(document.getElementById('root')!).render(

    <Provider store={store}>
        <PersistGate loading={<LoaderComponent/>} persistor={persistor}>
        <RouterProvider router={routes}/>
        </PersistGate>
    </Provider>
)
