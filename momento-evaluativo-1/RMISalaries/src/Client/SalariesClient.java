package Client;

import Interface.SalariesInterface;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.rmi.ConnectException;
import java.rmi.Naming;
import java.rmi.NotBoundException;
import java.util.Arrays;
import java.util.logging.Logger;

public class SalariesClient {

    public static void main(String[] args) throws IOException {
        int employees;
        int months;
        int[][] matrix;
        int choice;
        int totalPaid;
        int[] averagePaidPerMonth;
        int[] totalPaidPerEmployee;

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        do {
            System.out.println("Select an operation choice:");
            System.out.println("1. Calculate Salaries");
            System.out.println("2. Exit");
            System.out.print("Enter your choice: ");
            choice = Integer.parseInt(br.readLine());
            if (choice == 1) {
                try {
                    System.out.print("Enter the employees: ");
                    employees = Integer.parseInt(br.readLine());
                    System.out.print("Enter the months: ");
                    months = Integer.parseInt(br.readLine());
                    SalariesInterface salaries = (SalariesInterface) Naming.lookup("Salaries");
                    matrix = new int[employees][months];
                    matrix = salaries.generateSalaries(matrix);
                    System.out.println("Salaries: " + Arrays.deepToString(matrix));
                    totalPaid = salaries.calculateTotalPaid(matrix);
                    System.out.println("Total paid: " + totalPaid);
                    averagePaidPerMonth = salaries.calculateMonthAverage(matrix);
                    System.out.println("Average paid per month: " + Arrays.toString(averagePaidPerMonth));
                    totalPaidPerEmployee = salaries.calculateEmployeeTotal(matrix);
                    System.out.println("Total paid per employee: " + Arrays.toString(totalPaidPerEmployee));
                } catch (NotBoundException | ConnectException e) {
                    Logger.getLogger(SalariesInterface.class.getName()).severe(e.getMessage());
                    System.out.println();
                }
            }
            System.out.println();
        } while (choice != 2);

    }

}
