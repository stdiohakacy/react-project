import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import { Navbar } from './components/Navbar'

function App() {
    return (
        <Router>
            <Navbar />
            <div className="App">
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <section>
                                <h2>Welcome to redux</h2>
                            </section>
                        )}
                    />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}

export default App