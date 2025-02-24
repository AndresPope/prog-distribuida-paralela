package Interface;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface SalariesInterface extends Remote {

    int[][] generateSalaries(int[][] employeesSalaries) throws RemoteException;

    int[] calculateMonthAverage(int[][] employeesSalaries) throws RemoteException;

    int calculateTotalPaid(int[][] employeesSalaries) throws RemoteException;

    int[] calculateEmployeeTotal(int[][] employeesSalaries) throws RemoteException;


}
