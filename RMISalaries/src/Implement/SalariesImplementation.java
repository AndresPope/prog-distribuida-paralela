package Implement;

import Interface.SalariesInterface;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

public class SalariesImplementation extends UnicastRemoteObject implements SalariesInterface {


    public SalariesImplementation() throws RemoteException {
    }

    @Override
    public int[][] generateSalaries(int[][] employeesSalaries) throws RemoteException {
        int rows = employeesSalaries.length;
        int cols = employeesSalaries[0].length;
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                employeesSalaries[i][j] = (int) (Math.random() * 1000);
            }
        }
        return employeesSalaries;
    }

    @Override
    public int[] calculateMonthAverage(int[][] employeesSalaries) throws RemoteException {
        int[] averageMonthSalary = new int[employeesSalaries[0].length];
        int rows = employeesSalaries.length;
        int cols = employeesSalaries[0].length;
        for (int i = 0; i < cols; i++) {
            for (int[] salary : employeesSalaries) {
                averageMonthSalary[i] += salary[i];
            }
            averageMonthSalary[i] /= rows;
        }
        return averageMonthSalary;
    }

    @Override
    public int calculateTotalPaid(int[][] employeesSalaries) throws RemoteException {
        int totalPaid = 0;
        int cols = employeesSalaries[0].length;
        for (int[] salary : employeesSalaries) {
            for (int j = 0; j < cols; j++) {
                totalPaid += salary[j];
            }
        }
        return totalPaid;
    }

    @Override
    public int[] calculateEmployeeTotal(int[][] employeesSalaries) throws RemoteException {
        int rows = employeesSalaries.length;
        int[] employeeTotal = new int[rows];
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < employeesSalaries[0].length; j++) {
                employeeTotal[i] += employeesSalaries[i][j];
            }
        }
        return employeeTotal;
    }
}
