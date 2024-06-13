import React, { useContext, useEffect } from 'react'
import Chart from 'chart.js';
import { SocketContext } from '../context/socketContext';

export const BandChart = () => {
    
    const { socket } = useContext(SocketContext);
    
    useEffect(() => {
        socket.on('current-bands', (data) => {
            cargarGrafica( data );
        })
    }, [socket])
                
    const cargarGrafica = ( data = [] ) => {
        const ctx = document.getElementById('myChart');
        new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: data.map( data => data.name ),
                datasets: [{
                    label: 'Votes',
                    data: data.map( data => data.votes ),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)', // Rojo
                        'rgba(255, 206, 86, 0.5)', // Amarillo
                        'rgba(75, 192, 192, 0.5)', // Verde agua
                        'rgba(153, 102, 255, 0.5)', // Morado
                        'rgba(255, 159, 64, 0.5)', // Naranja
                        'rgba(255, 0, 0, 0.5)', // Rojo brillante
                        'rgba(255, 255, 0, 0.5)', // Amarillo brillante
                        'rgba(0, 255, 0, 0.5)', // Verde brillante
                        'rgba(0, 0, 255, 0.5)', // Azul brillante
                        'rgba(255, 0, 255, 0.5)' // Rosa
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)', // Rojo
                        'rgba(255, 206, 86, 1)', // Amarillo
                        'rgba(75, 192, 192, 1)', // Verde agua
                        'rgba(153, 102, 255, 1)', // Morado
                        'rgba(255, 159, 64, 1)', // Naranja
                        'rgba(255, 0, 0, 1)', // Rojo brillante
                        'rgba(255, 255, 0, 1)', // Amarillo brillante
                        'rgba(0, 255, 0, 1)', // Verde brillante
                        'rgba(0, 0, 255, 1)', // Azul brillante
                        'rgba(255, 0, 255, 1)' // Rosa
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                animation: false,
                // indexAxis: 'y',
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
   }
    
    return (
        <div>
            <canvas id="myChart"></canvas>
        </div>
    )
}
