import React, { useState } from 'react';
import ListImages from './images'

//window['offset'] = 0;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            img: '',
            images: [],
            pagination: { total_count: 0, count: 0, offset: 0 },
            offset : 0
        };
    }

    onChange = (event) => {
        this.setState({ term: event.target.value });
    }

    changeStateValue = (data) => {

        var offset = {...this.state.offset}

        //alert(offset);
        this.setState((state)=>({
            ...state,
            //term: '',
            img: data.data[0].images.fixed_height.url,
            //images : [...this.state.images,data.data],
            images : state.images.concat(data.data),
            //images: data.data,
            total_count : data.pagination.total_count,
            offset :  data.state.offset,
            count : data.pagination.count,

        }));
        //window['offset'] = data.pagination.offset;
        console.log(this.state);
        console.log(data);
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const api_key = 'sLZYU7lvnhUT11k7JVn3YdiN8DmGaYli';
        const url = `http://api.giphy.com/v1/gifs/search?q=${this.state.term}&api_key=${api_key}&offset=${this.state.offset}`;
        fetch(url)
            .then(response => response.json())
            .then(data =>
                this.changeStateValue(data)
            )
            .catch(e => console.log('error', e));
    }
    handleLoadNextRecords = (e) => {

         this.setState((state)=>({
             ... state,
             offset: state.offset + 25
         }));



        //window['offset'] = window['offset'] + 25;

    //     this.setState({ ... this.state,
    //         offset: this.state.offset + 25 }, function () {
    //         //setTimeout(this.handleSubmit(e),2000)
    //    });
       this.handleSubmit(e);


        console.log(this.state);
        //this.handleSubmit(e);
        //console.log(data);
    }
    render() {
        return (
            <>
                <div className="App">

                    <center>
                        <br />
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <form onSubmit={this.handleSubmit}>
                                            <input value={this.state.term} onChange={this.onChange} />
                                            <button>Search</button>
                                        </form>
                                    </td>
                                    <td>
                                        {this.state.total_count > 0 &&
                                         this.state.total_count !== this.state.images.length &&
                                            <button onClick={this.handleLoadNextRecords}>Load Next Data</button>

                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </center>
                    <br /><br />
                    <ListImages allData={this.state.images} />

                </div>
            </>
        );
    }
}

export default App;